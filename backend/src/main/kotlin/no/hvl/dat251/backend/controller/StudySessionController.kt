package no.hvl.dat251.backend.controller

import org.springframework.web.bind.annotation.CrossOrigin
import no.hvl.dat251.backend.dto.StudySessionUpdateDTO
import no.hvl.dat251.backend.entity.StudySession
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.repository.StudentRepository
import no.hvl.dat251.backend.repository.StudySessionRepository
import no.hvl.dat251.backend.repository.StudyGroupRepository
import no.hvl.dat251.backend.repository.SubjectRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping("api/studySessions")
class StudySessionController(
    @Autowired private val studySessionRepository: StudySessionRepository,
    @Autowired private val studentRepository: StudentRepository,
    @Autowired private val subjectRepository: SubjectRepository,
    @Autowired private val studyGroupRepository: StudyGroupRepository
    
){


    @GetMapping("")
    fun getStudySessions() : List<StudySession> =
        studySessionRepository.findAll().toList()

    @PostMapping("")
    fun creatStudySession(@RequestBody studySession: StudySession) : ResponseEntity<StudySession> {
        val savedStudySession = studySessionRepository.save(studySession)
        // hardcoded user
        studentRepository.findById(1).ifPresent {
            savedStudySession.registerStudent(studentRepository.findById(1).orElse(null))
        }
        return ResponseEntity.ok(savedStudySession)
    }

    @GetMapping("/{id}")
    fun getStudySessionById(@PathVariable("id") id : Long) : ResponseEntity<StudySession> {
        val StudySession = studySessionRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(StudySession, HttpStatus.OK)
    }

    @PatchMapping("/{id}")
    fun updateStudySession(
        @PathVariable id: Long,
        @RequestBody dto: StudySessionUpdateDTO
    ) : ResponseEntity<StudySession> {

        val studySession = studySessionRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)

        dto.subject?.let { studySession.subject = it }
        dto.endTime?.let { studySession.endTime = it }
        dto.completed?.let { studySession.completed = it }
        dto.startTime?.let { studySession.startTime = it }
        dto.attendanceIds?.let { studySession.attendance = studentRepository.findAllById(it).toMutableSet() }
        dto.location?.let { studySession.location = it }
        dto.studyGroupId?.let { studySession.studyGroup = studyGroupRepository.findById(it).orElse(null) }
        val updated = studySessionRepository.save(studySession)
        if (updated.completed == true) { updated.finish() }
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteStudySessionById(@PathVariable("id") id : Long) : ResponseEntity<StudySession> {
        if (!studySessionRepository.existsById(id)){
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
        studySessionRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}