'use strict';

const Controller = require('egg').Controller;

class ResourceController extends Controller {

    // 根据某个页面获得资源列表
    async getResourceForType() {
        const { ctx } = this;
        const query = ctx.request.query;
        const appId = query.appId;
        const url = query.url;
        const speedType = query.type || 1;
        const pageNo = query.pageNo;
        const pageSize = query.pageSize;

        if (!appId) throw new Error('单个页面资源性能列表：appId不能为空');
        if (!url) throw new Error('单个页面资源性能列表：url不能为空');

        const result = await ctx.service.web.webResource.getResourceForType(appId, url, speedType, pageNo, pageSize);

        ctx.body = this.app.result({
            data: result,
        });
    }

    // 获得error分类列表
    async getAverageErrorList() {
        const { ctx } = this;
        const query = ctx.request.query;
        const appId = query.appId;

        if (!appId) throw new Error('获得error分类列表：appId不能为空');

        const result = await ctx.service.web.webErrors.getAverageErrorList(ctx);

        ctx.body = this.app.result({
            data: result,
        });
    }

    // 获得单个Resource的平均性能数据
    async getOneResourceAvg() {
        const { ctx } = this;
        const query = ctx.request.query;
        const appId = query.appId;
        const url = query.url;

        if (!appId) throw new Error('单个Resource平均性能数据：appId不能为空');
        if (!url) throw new Error('单个Resource平均性能数据：api地址不能为空');

        const result = await ctx.service.web.webResource.getOneResourceAvg(appId, url);

        ctx.body = this.app.result({
            data: result,
        });
    }

    // 获得单个api的性能列表数据
    async getOneResourceList() {
        const { ctx } = this;
        const query = ctx.request.query;
        const appId = query.appId;
        const url = query.url;
        const pageNo = query.pageNo || 1;
        const pageSize = query.pageSize || this.app.config.pageSize;

        if (!appId) throw new Error('单个Resource性能列表数据：appId不能为空');
        if (!url) throw new Error('单个Resource性能列表数据：api地址不能为空');


        const result = await ctx.service.web.webResource.getOneResourceList(appId, url, pageNo, pageSize);

        ctx.body = this.app.result({
            data: result,
        });
    }
}

module.exports = ResourceController;
