package no.hvl.dat251.backend.exp

interface ExpObserver {
    fun update(xp: Double)
}

interface ExpObservervable {
    fun notifyObservers(xp: Double)

    fun register(observable: ExpObserver)

    fun deregister(observable: ExpObserver)
}

abstract class ExpObservervableBase : ExpObservervable {
    val observers: MutableList<ExpObserver> = mutableListOf()

    override fun notifyObservers(xp: Double) {
        for (observer in observers) {
            observer.update(xp)
        }
    }

    override fun register(observable: ExpObserver) {
        observers.add(observable)
    }

    override fun deregister(observable: ExpObserver) {
        observers.remove(observable)
    }
}
