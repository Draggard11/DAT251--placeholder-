package no.hvl.dat251.backend.groupMaker

abstract class FavoringUser : Comparable<FavoringUser>{
    val favSet: HashMap<FavoringUser, Int> = HashMap()

    fun setFavor(favUser: FavoringUser, int: Int) {
        favSet[favUser] = int
    }

    override fun compareTo(other: FavoringUser): Int {
        return favSet.getOrDefault(other, 0)
    }
}