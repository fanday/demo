package com.demo.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Metric.
 */
@Entity
@Table(name = "metric")
public class Metric implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "amount", nullable = false)
    private String amount;

    @ManyToMany
    @JoinTable(name = "metric_goal",
               joinColumns = @JoinColumn(name="metrics_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="goals_id", referencedColumnName="ID"))
    private Set<Goal> goals = new HashSet<>();

    @ManyToOne
    private Entry entry;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Set<Goal> getGoals() {
        return goals;
    }

    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Metric metric = (Metric) o;
        if(metric.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, metric.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Metric{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", amount='" + amount + "'" +
            '}';
    }
}
