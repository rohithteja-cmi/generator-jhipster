import messageBrokerTypes from './message-broker-types.js';

/**
 * Added new Options to jdl to collect communication parameters
 * @param client : Name of the application from which the communication will be sent
 * @param server : Name of the server to which the communication will be received
 * @cmi-tic-craxkumar
 */
const optionTypes = {
  STRING: 'string',
};

export const CommunicationTypes = {
  ASYNC: 'async',
  SYNC: 'sync',
  exists: (communicationtType?: any) => !!communicationtType && !!CommunicationTypes[communicationtType.toUpperCase().replace('-', '')],
};

export const CommunicationFrameworks = {
  ASYNC: {
    RABBITMQ: 'rabbitmq',
    PULSAR: 'pulsar',
  },
  SYNC: {
    API: 'rest-api',
  },
  exists: (communicationtFramework?: any) =>
    !!communicationtFramework && !!CommunicationFrameworks[communicationtFramework.toUpperCase().replace('-', '')],
};

export const CommunicationFrameworkTypes = {
  ASYNC: [CommunicationFrameworks.ASYNC.RABBITMQ, CommunicationFrameworks.ASYNC.PULSAR],
  SYNC: ['rest-api'],
};

export const RABBITMQ = CommunicationFrameworks.ASYNC.RABBITMQ;
export const PULSAR = CommunicationFrameworks.ASYNC.PULSAR;

const CommunicationOptionNames = {
  CLIENT: 'client',
  SERVER: 'server',
  COMMUNICATION_TYPE: 'type',
  FRAMEWORK_TYPE: 'framework',
};

const CommunicationOptionValues = {
  [CommunicationOptionNames.CLIENT]: undefined,
  [CommunicationOptionNames.SERVER]: undefined,
  [CommunicationOptionNames.COMMUNICATION_TYPE]: {
    ASYNC: CommunicationTypes.ASYNC,
    SYNC: CommunicationTypes.SYNC,
  },
  [CommunicationOptionNames.FRAMEWORK_TYPE]: {
    RABBITMQ: CommunicationFrameworks.ASYNC.RABBITMQ,
    PULSAR: CommunicationFrameworks.ASYNC.PULSAR,
    API: CommunicationFrameworks.SYNC.API,
  },
};

export interface Communication {
  server: string;
  client: string;
  type: string;
  framework: string;
  // Add other properties if present
}

const CommunicationOptions: any = {
  communicationType: {
    async: CommunicationTypes.ASYNC,
    sync: CommunicationTypes.SYNC,
  },
  frameworkTypes: {
    rabbitmq: CommunicationFrameworks.ASYNC.RABBITMQ,
    pulsar: CommunicationFrameworks.ASYNC.PULSAR,
    api: CommunicationFrameworks.SYNC.API,
  },
};

const CommunicationOptionTypes = {
  [CommunicationOptionNames.CLIENT]: { type: optionTypes.STRING },
  [CommunicationOptionNames.SERVER]: { type: optionTypes.STRING },
  [CommunicationOptionNames.COMMUNICATION_TYPE]: { type: optionTypes.STRING },
  [CommunicationOptionNames.FRAMEWORK_TYPE]: { type: optionTypes.STRING },
};

const communicationOptionTypes = CommunicationOptionTypes;
const communicationOptionNames = CommunicationOptionNames;
const communicationOptionValues = CommunicationOptionValues;

export { CommunicationOptions };

export default {
  CommunicationOptions,
  communicationOptionTypes,
  communicationOptionNames,
  communicationOptionValues,
  CommunicationTypes,
  CommunicationFrameworkTypes,
};
