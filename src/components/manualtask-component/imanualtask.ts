export interface IManualTask {
  id: string;
  flowNodeInstanceId?: string;
  name: string;
  correlationId: string;
  processModelId: string;
  processInstanceId?: string;
  tokenPayload: any;
}
