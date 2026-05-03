package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationRequest

interface GroupGenerator {
    fun generate(requests: List<GroupGenerationRequest>): List<List<Long>>
}