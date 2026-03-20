package no.hvl.dat251.backend.exp

interface ExpObserver<T> {
    fun update()
}

abstract class ExpObservervable<T>(
    val observers: MutableList<ExpObserver<T>> = mutableListOf(),
) {
    fun notifyObservers() {
        for (observer in observers) {
            observer.update()
        }
    }

    fun register(observable: ExpObserver<T>) {
        observers.add(observable)
    }

    fun deregister(observable: ExpObserver<T>) {
        observers.remove(observable)
    }
}
