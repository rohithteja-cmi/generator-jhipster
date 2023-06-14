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

import path from 'path';
import { createFolderIfItDoesNotExist, doesFileExist } from '../../utils/file-utils.js';
import { GENERATOR_NAME, writeCommunicationFile, writeConfigFile } from '../export-utils.js';

/**
 * Exports JDL applications to JDL files in separate folders (based on application base names).
 * Addationally passing content parameter to the function to write Communication config file.  @cmi-tic-craxkumar
 * @param {Array<Object>} applications -  the formatted applications to export
 * @param content
 */
export function exportApplications(applications, content) {
  if (!applications) {
    throw new Error('Applications have to be passed to be exported.');
  }
  applications.forEach(application => {
    writeApplicationFileForMultipleApplications(application, content);
  });
}

/**
 * Exports JDL a application to a JDL file in the current directory.
 * @param {Object} application - the formatted JHipster application to export.
 */
export function exportApplication(application) {
  writeConfigFile(application);
}

/**
 * This function writes a Yeoman config file in an application folder.
 * Addationally passing content parameter to the function to write Communication config file.  @cmi-tic-craxkumar
 * @param application
 * @param content
 */
function writeApplicationFileForMultipleApplications(application, content) {
  const applicationBaseName = application[GENERATOR_NAME].baseName;
  if (doesFileExist(applicationBaseName)) {
    throw new Error(
      `A file named '${applicationBaseName}' already exists, so a folder of the same name can't be created for the application.`
    );
  }
  createFolderIfItDoesNotExist(applicationBaseName);
  const messageBroker = writeCommunicationFileForMultipleApplications(
    content,
    applicationBaseName,
    path.join(applicationBaseName, 'comm.yo-rc.json')
  );
  application[GENERATOR_NAME].messageBroker = messageBroker || application[GENERATOR_NAME].messageBroker;
  writeConfigFile(application, path.join(applicationBaseName, '.yo-rc.json'));

  // This method write's communication File in each dir  @cmi-tic-craxkumar
}

/**
 * This method to write communication File in each dir  @cmi-tic-craxkumar
 *
 * @param content
 * @param yoRcPath
 */
function writeCommunicationFileForMultipleApplications(content, applicationBaseName, yoRcPath = 'comm.yo-rc.json') {
  return writeCommunicationFile(content, applicationBaseName, yoRcPath);
}
