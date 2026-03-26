package no.hvl.dat251.backend.controller

import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.repository.StudentRepository

import no.hvl.dat251.backend.entity.StudyGroup
import no.hvl.dat251.backend.repository.StudyGroupRepository

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("api/studygroups")
class StudyGroupsController(
        private val studyGroupRepository: StudyGroupRepository,
        private val studentRepository: StudentRepository
    )
    {
        @GetMapping("")
        fun getAllGroups(): ResponseEntity<List<StudyGroup>> {
            val groups = studyGroupRepository.findAll().toList()
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

        //PUT: What should be the logic here? 
        // We don't really have a method for changing a group's id but I guess we could clone it and delete the old? Or update StudyGroup, or add a service class


        //STUDENTS
        @GetMapping("/{id}/students")
        fun getStudents(@PathVariable id: Long): ResponseEntity<List<Student>> {
            val group = studyGroupRepository.findById(id).orElse(null)
            return ResponseEntity.ok(group.students.toList())
        }
        
        @GetMapping("/{group_id}/students/{student_id}")
        fun addStudentToGroup(@PathVariable("group_id") group_id: Long, @PathVariable("student_id") student_id: Long) : ResponseEntity<Void> {
            val group = studyGroupRepository.findById(group_id).orElse(null)
            val student = studentRepository.findById(student_id).orElse(null)

            //Todo: Handle rule against adding duplicates. This should probably be enforced in the StudyGroup class.
            //Chat also receommends adding this to a service class instead that handles business logic.
            group.addStudent(student)

            studyGroupRepository.save(group)
            return ResponseEntity.noContent().build()
        }

        @DeleteMapping("/{group_id}/students/{student_id}")
        fun removeStudentFromGroup(@PathVariable("group_id") group_id: Long, @PathVariable("student_id") student_id: Long) : ResponseEntity<Void> {
            val group = studyGroupRepository.findById(group_id).orElse(null)
            val student = studentRepository.findById(student_id).orElse(null)
            
            group.removeStudent(student)

            studyGroupRepository.save(group)
            return ResponseEntity.noContent().build()
        }


}
