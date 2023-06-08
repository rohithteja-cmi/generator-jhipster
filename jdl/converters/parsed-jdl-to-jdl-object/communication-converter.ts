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

import JDLCommunication from '../../models/jdl-communication.js';

export default { convertCommunications };

/**
 * Converts a parsed JDL content corresponding to deployments to an array of JDLCommunication objects.
 * @param {Array} parsedCommunications - parsed JDL deployments.
 * @return the converted JDLCommunication objects.
 */
export function convertCommunications(parsedCommunications): JDLCommunication[] {
  if (!parsedCommunications) {
    throw new Error('Communications have to be passed so as to be converted.');
  }
  return parsedCommunications.map(parsedCommunication => new JDLCommunication(parsedCommunication));
}
