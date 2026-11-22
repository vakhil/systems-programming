import { Project } from '../types';
import { PROJECTS_DATA_BASE } from './projectsDataPart1';
import { PROJECTS_DATA_EXTENDED } from './projectsDataPart2';

export const PROJECTS_DATA: Project[] = [
  ...PROJECTS_DATA_BASE,
  ...PROJECTS_DATA_EXTENDED,
];
