import { MiddlewareObj } from "@middy/core";
import createError from "http-errors";
import { SQSEvent, Context } from "aws-lambda";

export interface IRequest {
  event?: SQSEvent;
  context?: Context;
}

const defaults = {};

export const MyMiddleware = (opts = {}): MiddlewareObj => {
  const options = { ...defaults, ...opts };

  const MiddlewareBefore = async (request: IRequest) => {
    const { event } = request;

    if (
      event &&
      Object.keys(event).length !== 0 &&
      event?.Records &&
      event.Records?.length > 0
    ) {
      try {
        const body = JSON.parse(event.Records[0].body)
        request.event = {...body}
      } catch (e: any) {
        console.error(e);
        console.log(e)
        throw createError(400, e.toString());
      }
    } else {
      console.error("error");
      throw createError(400);
    }
  };

  return {
    before: MiddlewareBefore,
  };
};
