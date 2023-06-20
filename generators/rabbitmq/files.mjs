/* eslint-disable prettier/prettier */
import { SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';
import { moveToJavaPackageSrcDir } from '../server/support/index.mjs';
import { communications } from '../server/server-base.mjs';

/**
 * @type {import('../base/api.mjs').WriteFileSection}
 * The import { renameSync } from 'fs';
 * default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

export const rabbitFiles = {
  config: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['config/RabbitMQConfig.java'],
    },
  ],
  domain: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['domain/RabbitMessageModel.java'],
    },
  ],
  consumer: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      to: moveToJavaPackageSrcDir,
      templates: [
        {
          sourceFile: 'consumer/RabbitMQConsumer.java.ejs',
          destinationFile: 'config/rabbitMQ/RabbitMQConsumer.java',
        },
      ],
    },
  ],
  producer: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      to: moveToJavaPackageSrcDir,
      templates: [
        {
          sourceFile: 'producer/RabbitMQProducer.java.ejs',
          destinationFile: 'config/rabbitMQ/RabbitMQProducer.java',
        },
      ],
    },
  ],
};

export default async function writeRabbitMQFilesTask({ application }) {
  this.writeFiles({
    sections: rabbitFiles,
    context: application,
  });
}
