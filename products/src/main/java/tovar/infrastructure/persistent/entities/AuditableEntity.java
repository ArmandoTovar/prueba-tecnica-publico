package tovar.infrastructure.persistent.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class AuditableEntity extends PanacheEntityBase {
  @CreationTimestamp
  @Column(name = "create_date")
  private LocalDateTime createDate;
  @UpdateTimestamp
  @Column(name = "update_date")
  private LocalDateTime updateDate;
  @Column(length = 50, name = "create_by")
  private String createBy;
  @Column(length = 50, name = "update_by")
  private String updateBy;

  @PrePersist
  protected void onCreate() {
    this.createDate = LocalDateTime.now();
    this.updateDate = LocalDateTime.now();
  }
}
