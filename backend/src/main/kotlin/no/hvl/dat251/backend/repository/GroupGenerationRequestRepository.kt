package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.GroupGenerationRequest
import no.hvl.dat251.backend.entity.GroupGenerationPool
import org.springframework.data.repository.CrudRepository

interface GroupGenerationRequestRepository :CrudRepository<GroupGenerationRequest, Long>{
    fun findByPool(pool: GroupGenerationPool): List<GroupGenerationRequest>
}