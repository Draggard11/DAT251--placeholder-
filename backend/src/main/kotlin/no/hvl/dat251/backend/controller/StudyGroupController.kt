package no.hvl.dat251.backend.controller

import org.springframework.web.bind.annotation.CrossOrigin
import no.hvl.dat251.backend.dto.StudyGroupUpdateDTO
import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository

import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.entity.StudySession
import no.hvl.dat251.backend.repository.StudyGroupRepository
import no.hvl.dat251.backend.repository.StudySessionRepository
import no.hvl.dat251.backend.repository.SubjectRepository

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["http://localhost:5173"])
@RestController
@RequestMapping("api/studygroups")
class StudyGroupsController(
    @Autowired private val studentRepository: StudentRepository,
    @Autowired private val subjectRepository: SubjectRepository,
    @Autowired private val studyGroupRepository: StudyGroupRepository,
    @Autowired private val studySessionRepository: StudySessionRepository
    )
    {
        @GetMapping("")
        fun getAllGroups(): ResponseEntity<Set<StudyGroup>> {
            val groups = studyGroupRepository.findAll().toSet()
            return ResponseEntity.ok(groups)
        }

        @PostMapping("")
        fun createStudyGroup(@RequestBody studyGroup: StudyGroup) : ResponseEntity<StudyGroup>{
            val saved = studyGroupRepository.save(studyGroup)
            return ResponseEntity.ok(studyGroup)
        }

        @GetMapping("/{id}")
        fun getStudyGroupById(@PathVariable("id") id: Long) : ResponseEntity<StudyGroup> {
            val studyGroup = studyGroupRepository.findById(id).orElse(null)
            if (studyGroup != null) {
                return ResponseEntity(studyGroup, HttpStatus.OK)
            } else return ResponseEntity(HttpStatus.NOT_FOUND)
        }
        @PatchMapping("/{id}")
        fun updateStudyGroup(
            @PathVariable id: Long,
            @RequestBody dto: StudyGroupUpdateDTO
        ): ResponseEntity<StudyGroup> {

            val group = studyGroupRepository.findById(id).orElse(null)
                ?: return ResponseEntity(HttpStatus.NOT_FOUND)

            dto.name?.let { group.name = it }
            dto.studentsIds?.let {
                group.students = studentRepository.findAllById(it).toMutableSet()
            }
            dto.studySessionsIds?.let {
                group.studySessions = studySessionRepository.findAllById(it).toMutableSet()
            }


            val saved = studyGroupRepository.save(group)
            return ResponseEntity.ok(saved)
        }
        //STUDENTS
        @GetMapping("/{id}/students")
        fun getStudents(@PathVariable id: Long): ResponseEntity<Set<Student>> {
            val group = studyGroupRepository.findById(id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
            return ResponseEntity.ok(group.students.toSet())
        }
        
        @PostMapping("/{group_id}/students/{student_id}")
        fun addStudentToGroup(@PathVariable("group_id") group_id: Long, @PathVariable("student_id") student_id: Long) : ResponseEntity<Student> {
            val group = studyGroupRepository.findById(group_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
            val student = studentRepository.findById(student_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)

            group.addStudent(student)

            studyGroupRepository.save(group)
            return ResponseEntity.ok(student)
        }

        @DeleteMapping("/{group_id}/students/{student_id}")
        fun removeStudentFromGroup(@PathVariable("group_id") group_id: Long, @PathVariable("student_id") student_id: Long) : ResponseEntity<Student> {
            val group = studyGroupRepository.findById(group_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
            val student = studentRepository.findById(student_id).orElse(null)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
            
            group.removeStudent(student)

            studyGroupRepository.save(group)
            return ResponseEntity.ok(student)
        }

        @DeleteMapping("/{id}")
        fun deleteStudyGroupById(@PathVariable id: Long): ResponseEntity<Void> {
            if (!studyGroupRepository.existsById(id)) {
                return ResponseEntity.notFound().build()
            }

            studyGroupRepository.deleteById(id)
            return ResponseEntity.noContent().build()
        }


}
