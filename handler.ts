import { Context } from "aws-lambda";
import middy from "@middy/core";
import { MyMiddleware } from "./middleware";
import httpErrorHandler from "@middy/http-error-handler";

interface User {
  name: string;
  lastName: string;
}

const baseHandler = async function hello(event: User, context: Context) {
  console.log(event);
  return { statusCode: 200, body: "OK" };
};

export const handler = middy(baseHandler)
  .use(MyMiddleware())
  .use(httpErrorHandler());
