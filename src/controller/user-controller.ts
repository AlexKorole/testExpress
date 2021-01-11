import {
  Action, Body,
  Controller,
  Get,
  OnUndefined,
  Param,
  Post,
  UseAfter,
  UseBefore,
  UseInterceptor
} from 'routing-controllers';
import 'reflect-metadata';
import { loggingAfter, loggingBefore } from '../middleware/middleware';
import httpContext from 'express-http-context';
import { Info } from '../model/info';

@Controller()
export class UserController {
  @Get('/users/:id')
  @UseBefore(loggingBefore)
  @UseAfter(loggingAfter)
  // @UseInterceptor(function (action: Action, content: any) {
  //   console.log('change response...');
  //   content = 'interceptor';
  //   return content;
  // })
  getOne (@Param('id') id: number): string {
    console.log('do something in GET function...');
    return 'This action returns user #' + id;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne (@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
    console.log(`tracedId = ${httpContext.get('traceId')}`);
  }
}
