package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/students")
class StudentController(@Autowired private val studentRepository: StudentRepository){

    @GetMapping("")
    fun getStudents() : List<Student> =
        studentRepository.findAll().toList()

    @PostMapping("")
    fun creatStudent(@RequestBody student: Student) : ResponseEntity<Student> {
        val student = studentRepository.save(student)
        return ResponseEntity.ok(student)
    }

    @GetMapping("/{id}")
    fun getSudentById(@PathVariable("id") id : Long) : ResponseEntity<Student> {
        val student = studentRepository.findById(id).orElse(null)
        if (student != null) {
            return ResponseEntity(student, HttpStatus.OK)
        }else return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{id}")
    fun updateStudent(@PathVariable id: Long, @RequestBody student: Student) : ResponseEntity<Student> {

        val existingStudent = studentRepository.findById(id).orElse(null)
        if (existingStudent == null) {
            return ResponseEntity(HttpStatus.NOT_FOUND)
        }
        //ToDO
        return ResponseEntity.ok(student)
    }


}