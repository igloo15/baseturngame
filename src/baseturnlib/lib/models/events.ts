/**
 * Typed Callback
 */
export type Listener<T> = (event: T) => void;

/**
 * Disposable returned from a subscribe
 */
export interface Disposable {
    /**
     * Will unsubscribe from event
     */
    dispose(): any;
}

/**
 * TypedEvent is a callback event for a specific type of data
 */
export class TypedEvent<T> {
    private listeners: Array<Listener<T>> = [];
    private listenersOncer: Array<Listener<T>> = [];

    /**
     * Subscribe to this event with given callback
     */
    public on = (listener: Listener<T>): Disposable => {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    /**
     * Subscribe once to this event with given callback
     */
    public once = (listener: Listener<T>): void => {
        this.listenersOncer.push(listener);
    }

    /**
     * Unsubscribe from event
     */
    public off = (listener: Listener<T>) => {
        const callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) { this.listeners.splice(callbackIndex, 1); }
    }

    /**
     * Publish data to all subscribers
     */
    public emit = (event: T) => {
        /** Update any general listeners */
        this.listeners.forEach((listener) => listener(event));

        /** Clear the `once` queue */
        this.listenersOncer.forEach((listener) => listener(event));
        this.listenersOncer = [];
    }

    /**
     * Pipe all the data from this event to another event
     */
    public pipe = (te: TypedEvent<T>): Disposable => {
        return this.on((e) => te.emit(e));
    }
}