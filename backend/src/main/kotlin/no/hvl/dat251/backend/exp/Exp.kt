package no.hvl.dat251.backend.exp

data class Exp(
    var xp: Float = 0f,
    var xpModifier: Float = 0f,
) {
    fun calculate(): Float {
        return xp * xpModifier
    }
}
