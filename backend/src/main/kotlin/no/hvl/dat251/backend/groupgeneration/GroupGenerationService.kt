package no.hvl.dat251.backend.groupgeneration

import no.hvl.dat251.backend.entity.GroupGenerationPool
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.repository.GroupGenerationPoolRepository
import no.hvl.dat251.backend.repository.GroupGenerationRequestRepository
import no.hvl.dat251.backend.repository.StudentRepository
import no.hvl.dat251.backend.repository.StudyGroupRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GroupGenerationService {

    @Autowired
    private lateinit var poolRepository: GroupGenerationPoolRepository

    @Autowired
    private lateinit var requestRepository: GroupGenerationRequestRepository

    @Autowired
    private lateinit var studentRepository: StudentRepository

    @Autowired
    private lateinit var studyGroupRepository: StudyGroupRepository

    @Autowired
    private lateinit var groupGenerator: GroupGenerator

    fun generateGroups(): List<StudyGroup> {
        val pool = poolRepository.findAll().firstOrNull { it.open }
            ?: throw IllegalStateException("No open pool found")

        val requests = requestRepository.findByPool(pool)
        val groups = groupGenerator.generate(requests)

        val savedGroups = groups.map { studentIds ->
            val members = studentIds.mapNotNull { studentRepository.findById(it).orElse(null) }
            studyGroupRepository.save(
                StudyGroup(
                    students = members.toMutableSet()
                )
            )
        }

        pool.open = false
        poolRepository.save(pool)

        return savedGroups
    }
}