//auditStatus	实名认证状态 -1未认证 0代表认证失败 1代表认证通过 2代表认证中
export enum AuditStatus {
  NoAudit = -1, // 1未认证
  AuditFailed = 0, // 0代表认证失败
  Audited = 1, //  1代表认证通过
  Auditing = 2 // 2代表认证中
}
