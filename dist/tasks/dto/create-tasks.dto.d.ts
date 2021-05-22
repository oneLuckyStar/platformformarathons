export declare class CreateTasksDto {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly url: string;
  readonly marathonId: string;
}
export declare class GetTaskParamsDto {
  readonly taskId: string;
  readonly marathonId: string;
}
export declare class GetAllByIdParamsDto {
  readonly id: string;
}
