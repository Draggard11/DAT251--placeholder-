package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.dto.StudentUpdateDTO
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository
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
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/students")
class StudentController(
    @Autowired private val studentRepository: StudentRepository,
    @Autowired private val subjectRepository: SubjectRepository,
    @Autowired private val studyGroupRepository: StudyGroupRepository
){

    @GetMapping("")
    fun getStudents() : List<Student> =
        studentRepository.findAll().toList()

    @PostMapping("")
    fun creatStudent(@RequestBody student: Student) : ResponseEntity<Student> {
        val savedStudent = studentRepository.save(student)
        return ResponseEntity.ok(savedStudent)
    }

    @GetMapping("/{id}")
    fun getSudentById(@PathVariable("id") id : Long) : ResponseEntity<Student> {
        val student = studentRepository.findById(id).orElse(null)
        if (student != null) {
            return ResponseEntity(student, HttpStatus.OK)
        }else return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PatchMapping("/{id}")
    fun updateStudent(@PathVariable id: Long,
                      @RequestBody dto: StudentUpdateDTO) : ResponseEntity<Student> {

        val student = studentRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)

        dto.name?.let { student.name = it }
        dto.email?.let { student.email = it }
        dto.dateOfBirth?.let { student.dateOfBirth = it }
        dto.enrollmentDate?.let { student.enrollmentDate = it }

        dto.activeSubjectIds?.let {
            student.activeSubjects = subjectRepository.findAllById(it).toMutableList()
        }

        dto.completedSubjectIds?.let {
            student.completedSubjects = subjectRepository.findAllById(it).toMutableList()
        }

        dto.studyGroupIds?.let {
            student.studygroups = studyGroupRepository.findAllById(it).toMutableList()
        }

        val updated = studentRepository.save(student)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteStudentById(@PathVariable("id") id : Long) : ResponseEntity<Student> {
        if (!studentRepository.existsById(id)){
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
        studentRepository.deleteById(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }

}