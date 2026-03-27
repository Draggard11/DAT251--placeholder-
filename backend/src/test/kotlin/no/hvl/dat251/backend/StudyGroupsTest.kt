package no.hvl.dat251.backend



import no.hvl.dat251.backend.entity.Student
import no.hvl.dat251.backend.entity.StudyGroup
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Assertions

class StudyGroupsTest {

    @Test
    @DisplayName("new group is empty")
    fun newGroupIsEmpty() {
        var studyGroup = StudyGroup()
        Assertions.assertEquals(0, studyGroup.students.size)
    }

    @Test
    @DisplayName("add student to group")
    fun generateNewStudent() {
        var studyGroup = StudyGroup()
        var student = Student(name = "John Doe")
        studyGroup.addStudent(student)
        Assertions.assertEquals(1, studyGroup.students.size)
        Assertions.assertEquals(student, studyGroup.students.first())
    }


    @Test
    @DisplayName("remove student from group")
    fun removeStudentFromGroup() {
        var student = Student(name = "John Doe")
        var studyGroup = StudyGroup()
        studyGroup.addStudent(student)
        Assertions.assertEquals(1, studyGroup.students.size)
        Assertions.assertEquals(student, studyGroup.students.first())
        studyGroup.removeStudent(student)
        Assertions.assertEquals(0, studyGroup.students.size)
    }

    @Test
    @DisplayName("create group of two students")
    fun createGroupOfTwoStudents() {
        var student0 = Student(name = "John Doe")
        var student1 = Student(name = "Tom Smith")
        var student2 = Student(name = "Jane Doe")
        var group = StudyGroup(students =  mutableSetOf(student0, student1, student2))
        Assertions.assertEquals(3, group.students.size)
        Assertions.assertTrue(group.students.contains(student0))
        Assertions.assertTrue(group.students.contains(student1))
        Assertions.assertTrue(group.students.contains(student2))
    }

    @Test
    @DisplayName("add student to existing group")
    fun addExistingGroup() {
        var student0 = Student(name = "John Doe")
        var student1 = Student(name = "Tom Smith")
        var student2 = Student(name = "Jane Doe")
        var group = StudyGroup(students = mutableSetOf(student0, student1))
        group.addStudent(student2)
        Assertions.assertEquals(3, group.students.size)
        Assertions.assertTrue(group.students.contains(student2))
    }

}

