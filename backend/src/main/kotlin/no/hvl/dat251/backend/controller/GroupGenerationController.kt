package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.repository.StudentRepository
import no.hvl.dat251.backend.repository.GroupGenerationPoolRepository
import no.hvl.dat251.backend.repository.GroupGenerationRequestRepository
import no.hvl.dat251.backend.repository.StudyGroupRepository

import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.GroupGenerationPool
import no.hvl.dat251.backend.entity.GroupGenerationRequest
import no.hvl.dat251.backend.entity.StudyGroup

import no.hvl.dat251.backend.groupgeneration.GroupGenerationService

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.GetMapping

@RestController
@RequestMapping("api/groupgeneration")
class GroupGenerationController(
    @Autowired private val poolRepository: GroupGenerationPoolRepository,
    @Autowired private val requestRepository: GroupGenerationRequestRepository,
    @Autowired private val studentRepository: StudentRepository,
    @Autowired private var groupGenerationService: GroupGenerationService,
    @Autowired private var studyGroupRepository: StudyGroupRepository
) {
    @PostMapping("/pool/join")
    fun joinPool(@RequestBody body: JoinPoolRequest): ResponseEntity<String> {
        val pool = poolRepository.findAll().firstOrNull {it.open}
            ?: return ResponseEntity.badRequest().body("No open pool found")

        val student = studentRepository.findById(body.studentId).orElse(null)
            ?: return ResponseEntity.badRequest().body("Student not found")

        val request = GroupGenerationRequest(
            pool = pool,
            student = student,
            preferredStudentIds = body.preferredStudentIds
        )

        requestRepository.save(request)
        return ResponseEntity.ok("Joined pool successfully")
    }

    @PostMapping("/pool/generate")
    fun generateGroups(): ResponseEntity<String> {
        groupGenerationService.generateGroups()
        return ResponseEntity.ok("Groups generated successfully")
    }

    @PostMapping("/pool/create")
    fun createPool(): ResponseEntity<String> {
        val pool = GroupGenerationPool(open = true)
        poolRepository.save(pool)
        return ResponseEntity.ok("Pool created successfully")
    }

    @PostMapping("/pool/seed")
    fun seedPool(@RequestParam count: Int = 10): ResponseEntity<String> {
        val pool = poolRepository.findAll().firstOrNull { it.open }
            ?: return ResponseEntity.badRequest().body("No open pool found")

        repeat(count) { i ->
            val student = studentRepository.save(Student(name = "Test Student $i"))
            requestRepository.save(
                GroupGenerationRequest(
                    pool = pool,
                    student = student,
                    preferredStudentIds = emptyList()
                )
            )
        }
        return ResponseEntity.ok("$count students created and added to pool")
    }

    @GetMapping("/pool/groups")
    fun getGroups(): ResponseEntity<List<StudyGroup>> {
        val groups = studyGroupRepository.findAll().toList()
        return ResponseEntity.ok(groups)
    }
}