package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.entity.StudySession
import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.Subject
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

@RestController
@RequestMapping("api/subjects")
class SubjectController(
    @Autowired private val studySessionRepository: StudySessionRepository,
    @Autowired private val studentRepository: StudentRepository,
    @Autowired private val subjectRepository: SubjectRepository,
    @Autowired private val studyGroupRepository: StudyGroupRepository

){



    @GetMapping("")
    fun getSubjects() : List<Subject> =
        subjectRepository.findAll().toList()

    @PostMapping("")
    fun creatSubject(@RequestBody subject: Subject) : ResponseEntity<Subject> {
        val savedSubjects = subjectRepository.save(subject)
        return ResponseEntity.ok(savedSubjects)
    }

    @GetMapping("/{id}")
    fun getSubjectById(@PathVariable("id") id : Long) : ResponseEntity<Subject> {
        val subject = subjectRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(subject, HttpStatus.OK)
    }
    @GetMapping("/{id}/students")
    fun getStudentsSubjectById(@PathVariable("id") id : Long) : ResponseEntity<Set<Student>> {
        val subject = subjectRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity(subject.students, HttpStatus.OK)
    }

    @PostMapping("/{subject_id}/students/{student_id}")
    fun addStudentToSubject(@PathVariable("subject_id") subject_id: Long, @PathVariable("student_id") student_id: Long) : ResponseEntity<Student> {
        val subject = subjectRepository.findById(subject_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        val student = studentRepository.findById(student_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)

        subject.addStudent(student)

        subjectRepository.save(subject)
        return ResponseEntity.ok(student)
    }

    @DeleteMapping("/{id}")
    fun deleteSubjectById(@PathVariable("id") id : Long) : ResponseEntity<Subject> {
        if (!subjectRepository.existsById(id)){
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
        subjectRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }


}