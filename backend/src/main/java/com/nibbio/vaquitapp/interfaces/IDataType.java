package com.nibbio.vaquitapp.interfaces;

public interface IDataType {
    <T> T getData(String json, Class<T> tClass);
}
