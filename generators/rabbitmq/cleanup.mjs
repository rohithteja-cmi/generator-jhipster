import { SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';
import { communications } from '../server/server-base.mjs';

/* eslint-disable prettier/prettier */
/**
 * @typedef {import('../server/types.mjs').SpringBootApplication} SpringBootApplication
 */
/**
 * @typedef {import('./generator.mjs')} RabbitMQGenerator
 */
/**
 * @typedef {import('../base-application/tasks.mjs').ApplicationTaskParam<SpringBootApplication>} CleanupTaskParam
 */
/**
 * Removes server files that where generated in previous JHipster versions and therefore
 * need to be removed.
 *
 * @this {this} - RabbitMQGenerator
 * @param {CleanupTaskParam} - args
 */
export default function cleanupRabbitMQFilesTask({ application }) {
    this.removeFile(`${application.javaPackageSrcDir}config/RabbitMQConfig.java`);
    this.removeFile(`${application.javaPackageSrcDir}domain/RabbitMessageModel.java`);
    this.removeFile(`${application.javaPackageSrcDir}config/rabbitMQ/RabbitMQConsumer.java`);
    this.removeFile(`${application.javaPackageSrcDir}config/rabbitMQ/RabbitMQProducer.java`);
}
