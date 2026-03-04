package no.hvl.dat251.backend
import no.hvl.dat251.backend.Student


import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Assertions

class StudentClassTests {

    @Test
    @DisplayName("Generate new student")
    fun generateNewStudent() {
        var student = Student("John Doe")
        Assertions.assertEquals("John Doe", student.name)
    }

    //@Test
    //@DisplayName("Two new students have different ID's")

    
    
}