package com.found404.gameoflife.entity;

import java.time.Instant;

import com.found404.gameoflife.enums.TaskType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//todo: add category
//todo: add parent task

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** Owner of this task */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskType type;

    @Column
    private String description;

    @Column(nullable = false)
    private Integer difficulty = 1;

    /**
     * For HABIT: how many times per week is the goal?
     * For SINGLE: null.
     */
    private Integer targetPerWeek;

    /**
     * For SINGLE tasks: true once done.
     * For HABIT: you can either ignore it or use it for “archived”.
     */
    @Column(nullable = false)
    private boolean completed = false;

    /** When the task was created */
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    /** For SINGLE: when it was completed (optional) */
    private Instant completedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

}
