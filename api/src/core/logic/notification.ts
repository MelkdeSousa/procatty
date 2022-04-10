export class Notification {
  constructor(public key: string, public message: string) { }
}

export class Notifications {
  private notifications: Notification[] = []

  public add(notification: Notification) {
    this.notifications.push(notification)
  }

  public addAll(notifications: Notification[]) {
    this.notifications.push(...notifications)
  }

  public get(key: string): Notification | null {
    return this.notifications.find(n => n.key === key) || null
  }

  public getAll(): ReadonlyArray<Notification> {
    return this.notifications
  }

  public has(key: string): boolean {
    return this.notifications.some(n => n.key === key)
  }

  public hasAny(): boolean {
    return this.notifications.length > 0
  }

  public hasAll(): boolean {
    return this.notifications.length === 0
  }

  public clear() {
    this.notifications = []
  }
}
