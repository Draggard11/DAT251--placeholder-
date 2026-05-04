package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationRequest
import no.hvl.dat251.backend.entity.Subject

interface GroupGenerator {
    fun generate(subject: Subject): List<List<Long>>
}