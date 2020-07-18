#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { MicroserviceCdkStack } from '../lib/microservice-cdk-stack';

const app = new cdk.App();
new MicroserviceCdkStack(app, 'MicroserviceCdkStack');
