#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const microservice_cdk_stack_1 = require("../lib/microservice-cdk-stack");
const app = new cdk.App();
new microservice_cdk_stack_1.MicroserviceCdkStack(app, 'MicroserviceCdkStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlLWNkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pY3Jvc2VydmljZS1jZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQXFDO0FBQ3JDLDBFQUFxRTtBQUVyRSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLDZDQUFvQixDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgTWljcm9zZXJ2aWNlQ2RrU3RhY2sgfSBmcm9tICcuLi9saWIvbWljcm9zZXJ2aWNlLWNkay1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTWljcm9zZXJ2aWNlQ2RrU3RhY2soYXBwLCAnTWljcm9zZXJ2aWNlQ2RrU3RhY2snKTtcbiJdfQ==