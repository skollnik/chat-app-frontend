import { v4 } from "uuid";

export class Observable<T extends Record<keyof T, (...args: any[]) => void>> {
  private subscriptions: { id: string; event: keyof T; handler: any }[] = [];
  bind<K extends keyof T>(eventName: K, handler: T[K]): string {
    const subscription = { event: eventName, handler };
    const uuid = v4();
    this.subscriptions.push({ id: uuid, ...subscription });
    return uuid;
  }

  unbind(id: string) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
  }

  emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription.event === eventName) {
        subscription.handler(...args);
      }
    });
  }
}
