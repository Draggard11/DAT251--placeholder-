package no.hvl.dat251.backend.groupMaker

class GroupMaker(
    val user: FavoringUser,
) {
    val sm = StableMatching(user.favSet)
}
