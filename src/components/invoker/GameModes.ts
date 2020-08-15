export const TenGameMode = 'ten';
export const CompleteGameMode = 'complete';
export const TrainingGameMode = 'training';

export const GameModes = [TenGameMode, CompleteGameMode, TrainingGameMode]

export type GameModeType = typeof TenGameMode | typeof CompleteGameMode | typeof TrainingGameMode


export const UnstartedStatus = 'unstarted';
export const StartedStatus = 'started';
export const FinishedStatus = 'finished';

export const GameStatus = [
  UnstartedStatus,
  StartedStatus,
  FinishedStatus
]

export type GameStatusType = typeof UnstartedStatus | typeof StartedStatus | typeof FinishedStatus;