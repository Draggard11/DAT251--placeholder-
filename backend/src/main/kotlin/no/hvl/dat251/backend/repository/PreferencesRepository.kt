package no.hvl.dat251.backend.repository

import no.hvl.dat251.backend.entity.GroupPreference
import no.hvl.dat251.backend.entity.Preferences
import org.springframework.data.repository.CrudRepository
import java.util.Optional

interface PreferencesRepository : CrudRepository<GroupPreference, Long> {
    fun findBySubjectId(username: String): Optional<Preferences>
}