package tovar.gateway.config.properties;

import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.CollectionUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties("application.security")
public class SecurityProperties {
  private Set<String> whiteList;

  public String[] getWhiteListArray() {

    if (CollectionUtils.isEmpty(whiteList))
      return new String[0];

    return whiteList.stream().filter(StringUtils::isNotBlank).toArray(String[]::new);
  }
}
