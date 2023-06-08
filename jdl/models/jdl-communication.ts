/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import _ from 'lodash';
import { communicationOptions } from '../jhipster/index.mjs';

const { CommunicationTypes, CommunicationFrameworkTypes } = communicationOptions;

export default class JDLCommunication {
  constructor(args) {
    if (!args || !args.type) {
      throw new Error('The communicationType is mandatory to create a communication.');
    }
    Object.entries(args).forEach(([key, option]) => {
      if (key === communicationOptions.communicationOptionNames.COMMUNICATION_TYPE) {
        if (option === CommunicationTypes.ASYNC) {
          if (CommunicationFrameworkTypes.ASYNC.includes(args[communicationOptions.communicationOptionNames.FRAMEWORK_TYPE])) {
            this[key] = option;
          } else {
            throw new Error('Available Async Types "rabbitmq", "pulsar".');
          }
        } else if (option === CommunicationTypes.SYNC) {
          if (CommunicationFrameworkTypes.SYNC.includes(args[communicationOptions.communicationOptionNames.FRAMEWORK_TYPE])) {
            this[key] = option;
          } else {
            throw new Error('Available Async Types "rest-api".');
          }
        }
      } else {
        this[key] = option;
      }
    });
  }
}

function defaults(communicationType) {
  return (communicationOptions.CommunicationOptions as any).defaults(communicationType);
}
