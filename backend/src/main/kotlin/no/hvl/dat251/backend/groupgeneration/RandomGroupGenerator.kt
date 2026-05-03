package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationRequest
import org.springframework.stereotype.Service

@Service
class RandomGroupGenerator : GroupGenerator {
    override fun generate(requests: List<GroupGenerationRequest>): List<List<Long>> {
        val studentIds = requests.mapNotNull { it.student?.id }
        val shuffled = studentIds.shuffled()
        return shuffled.chunked(3)
    }
}