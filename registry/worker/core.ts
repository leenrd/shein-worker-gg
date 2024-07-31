interface Step<I> {
  step: <O>(
    action: (prevResult: Awaited<I>, req: any) => O | Promise<O>
  ) => Step<O>;
  finally: (action: (prevResult: Awaited<I>, req: any) => any) => any;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class ControllerFlow {
  private steps: Function[] = [];
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  createController = (setupStep: (step: Step<any>) => void) => {
    const create: Step<any> = {
      step: <O>(action: <I>(prevResult: I, req: any) => O | Promise<O>) => {
        this.steps.push(action);
        return create as Step<O>;
      },
      finally: (action: <I>(prevResult: I, req: any) => any) => {
        this.steps.push(action);
      },
    };

    setupStep(create);

    const handler = async (req: any, res: any) => {
      const stepIndex = Number(req.query.step) || 0;

      if (stepIndex >= this.steps.length) {
        return res.status(200).send("All tasks completed successfully");
      }

      try {
        if (stepIndex === 0) {
          await this.executeStep(
            req.path,
            req.method as HttpMethod,
            0,
            req.body || req.query
          );
          return res.status(202).send("Workflow started");
        } else {
          const result = await this.steps[stepIndex](
            req.body || req.query,
            req
          );

          if (stepIndex < this.steps.length - 1) {
            await this.executeStep(
              req.path,
              req.method as HttpMethod,
              stepIndex + 1,
              result
            );
          }

          return res.status(200).send("Step completed");
        }
      } catch (error) {
        console.error(`Error in step ${stepIndex}:`, error);
        return res.status(500).json({ error: "Workflow error" });
      }
    };

    return {
      GET: handler,
      POST: handler,
      PUT: handler,
      DELETE: handler,
      PATCH: handler,
    };
  };

  private async executeStep(
    path: string,
    method: HttpMethod,
    step: number,
    body: any
  ) {
    setTimeout(() => {
      fetch(`${this.baseUrl}${path}?step=${step}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      }).catch((error) =>
        console.error(`Error executing step ${step}:`, error)
      );
    }, 0);
  }
}
