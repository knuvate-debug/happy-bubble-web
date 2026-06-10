export function sessionPath(sessionId: string) {
  return `/sessions/${sessionId}`;
}

export function theaterPath(sessionId: string) {
  return `/theater/${sessionId}`;
}

export function gamePath(sessionId: string) {
  return `/game/${sessionId}`;
}

export function singingPath(sessionId: string) {
  return `/singing/${sessionId}`;
}

export function missionPath(sessionId: string) {
  return `/mission/${sessionId}`;
}

export function reportPath(sessionId: string) {
  return sessionId === "s15" ? "/report/s15" : `/mission/${sessionId}`;
}
