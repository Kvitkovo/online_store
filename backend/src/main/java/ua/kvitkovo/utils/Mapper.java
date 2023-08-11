package ua.kvitkovo.utils;

import java.util.List;
import java.util.Optional;

/**
 * @author Andriy Gaponov
 */
public interface Mapper<E, D, R> {

    D mapEntityToDto(E source) throws RuntimeException;

    E mapDtoToEntity(D source) throws RuntimeException;
    D mapDtoRequestToDto(R source) throws RuntimeException;

    default List<D> mapEntityToDto(List<E> source) throws RuntimeException {
        return Optional.ofNullable(source)
                .map(sourceList -> sourceList.stream()
                        .map(this::mapEntityToDto)
                        .toList())
                .orElse(null);
    }

    default List<E> mapDtoToEntity(List<D> source) throws RuntimeException {
        return Optional.ofNullable(source)
                .map(sourceList -> sourceList.stream()
                        .map(this::mapDtoToEntity)
                        .toList())
                .orElse(null);
    }
}
