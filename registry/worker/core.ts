interface Step<T> {
  create: <U>(action: (prevResult: T) => Promise<U> | U) => Step<U>;
  finally: (action: (prevResult: T) => Promise<any> | any) => void;
}

export class CnCore {
  private steps: Array<(prevResult: any) => Promise<any> | any> = [];
  private maxRetryAttempts = 2;
  private timeout = 5000; // 5 seconds timeout

  createController(setup: (step: Step<any>) => void) {
    const step: Step<any> = {
      create: <U>(action: (prevResult: any) => Promise<U> | U) => {
        this.steps.push(action);
        return step as Step<U>;
      },
      finally: (action: (prevResult: any) => Promise<any> | any) => {
        this.steps.push(action);
      },
    };

    setup(step);

    return {
      POST: async (req: any, res: any) => {
        try {
          const result = await this.executeSteps();
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    };
  }

  private async executeSteps() {
    let result: any = undefined;
    for (const step of this.steps) {
      result = await this.retryStep(() => step(result));
    }
    return result;
  }

  private async retryStep(
    step: () => Promise<any> | any,
    attempt: number = 0
  ): Promise<any> {
    try {
      const result = await Promise.race([
        Promise.resolve(step()),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), this.timeout)
        ),
      ]);

      return result;
    } catch (error) {
      if (error.message === "Timeout" && attempt < this.maxRetryAttempts) {
        console.log(`Retrying step, attempt ${attempt + 1}`);
        return this.retryStep(step, attempt + 1);
      } else {
        throw error;
      }
    }
  }
}
