/**
 * Typed Callback
 */
export type Listener<T> = (event: T) => void;

/**
 * Intercepts event data and modifies it before getting to listeners
 */
export type Interceptor<T> = (event: T) => T;

/**
 * Disposable returned from a subscribe
 */
export interface IDisposable {
    /**
     * Will unsubscribe from event
     */
    dispose(): any;
}

export interface ITypedEvent<T> {
    on(listener: Listener<T>): IDisposable;
    once(listener: Listener<T>);
    off(listener: Listener<T>);
    intercept(interceptor: Interceptor<T>);
    emit(event: T);
    pipe(typedEvent: ITypedEvent<T>): IDisposable;
}

/**
 * TypedEvent is a callback event for a specific type of data
 */
export class TypedEvent<T> implements ITypedEvent<T> {
    private listeners: Array<Listener<T>> = [];
    private listenersOncer: Array<Listener<T>> = [];
    private interceptors: Array<Interceptor<T>> = [];

    /**
     * Subscribe to this event with given callback
     */
    public on = (listener: Listener<T>): IDisposable => {
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

    public intercept = (interceptor: Interceptor<T>) => {
        this.interceptors.push(interceptor);
    }

    /**
     * Publish data to all subscribers
     */
    public emit = (event: T) => {
        /** Intercept before emitting */
        this.interceptors.forEach(interceptor => {
            event = interceptor(event);
        });
        /** Update any general listeners */
        this.listeners.forEach((listener) => listener(event));

        /** Clear the `once` queue */
        this.listenersOncer.forEach((listener) => listener(event));
        this.listenersOncer = [];
    }

    /**
     * Pipe all the data from this event to another event
     */
    public pipe = (te: ITypedEvent<T>): IDisposable => {
        return this.on((e) => te.emit(e));
    }
}