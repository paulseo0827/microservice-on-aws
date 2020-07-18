package hipstershop;

import static io.grpc.MethodDescriptor.generateFullMethodName;
import static io.grpc.stub.ClientCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ClientCalls.asyncClientStreamingCall;
import static io.grpc.stub.ClientCalls.asyncServerStreamingCall;
import static io.grpc.stub.ClientCalls.asyncUnaryCall;
import static io.grpc.stub.ClientCalls.blockingServerStreamingCall;
import static io.grpc.stub.ClientCalls.blockingUnaryCall;
import static io.grpc.stub.ClientCalls.futureUnaryCall;
import static io.grpc.stub.ServerCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ServerCalls.asyncClientStreamingCall;
import static io.grpc.stub.ServerCalls.asyncServerStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnaryCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.17.0)",
    comments = "Source: demo.proto")
public final class ProductCatalogServiceGrpc {

  private ProductCatalogServiceGrpc() {}

  public static final String SERVICE_NAME = "hipstershop.ProductCatalogService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.Empty,
      hipstershop.Demo.ListProductsResponse> getListProductsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListProducts",
      requestType = hipstershop.Demo.Empty.class,
      responseType = hipstershop.Demo.ListProductsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.Empty,
      hipstershop.Demo.ListProductsResponse> getListProductsMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.Empty, hipstershop.Demo.ListProductsResponse> getListProductsMethod;
    if ((getListProductsMethod = ProductCatalogServiceGrpc.getListProductsMethod) == null) {
      synchronized (ProductCatalogServiceGrpc.class) {
        if ((getListProductsMethod = ProductCatalogServiceGrpc.getListProductsMethod) == null) {
          ProductCatalogServiceGrpc.getListProductsMethod = getListProductsMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.Empty, hipstershop.Demo.ListProductsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.ProductCatalogService", "ListProducts"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.Empty.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.ListProductsResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ProductCatalogServiceMethodDescriptorSupplier("ListProducts"))
                  .build();
          }
        }
     }
     return getListProductsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.GetProductRequest,
      hipstershop.Demo.Product> getGetProductMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetProduct",
      requestType = hipstershop.Demo.GetProductRequest.class,
      responseType = hipstershop.Demo.Product.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.GetProductRequest,
      hipstershop.Demo.Product> getGetProductMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.GetProductRequest, hipstershop.Demo.Product> getGetProductMethod;
    if ((getGetProductMethod = ProductCatalogServiceGrpc.getGetProductMethod) == null) {
      synchronized (ProductCatalogServiceGrpc.class) {
        if ((getGetProductMethod = ProductCatalogServiceGrpc.getGetProductMethod) == null) {
          ProductCatalogServiceGrpc.getGetProductMethod = getGetProductMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.GetProductRequest, hipstershop.Demo.Product>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.ProductCatalogService", "GetProduct"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.GetProductRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.Product.getDefaultInstance()))
                  .setSchemaDescriptor(new ProductCatalogServiceMethodDescriptorSupplier("GetProduct"))
                  .build();
          }
        }
     }
     return getGetProductMethod;
  }

  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.SearchProductsRequest,
      hipstershop.Demo.SearchProductsResponse> getSearchProductsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SearchProducts",
      requestType = hipstershop.Demo.SearchProductsRequest.class,
      responseType = hipstershop.Demo.SearchProductsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.SearchProductsRequest,
      hipstershop.Demo.SearchProductsResponse> getSearchProductsMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.SearchProductsRequest, hipstershop.Demo.SearchProductsResponse> getSearchProductsMethod;
    if ((getSearchProductsMethod = ProductCatalogServiceGrpc.getSearchProductsMethod) == null) {
      synchronized (ProductCatalogServiceGrpc.class) {
        if ((getSearchProductsMethod = ProductCatalogServiceGrpc.getSearchProductsMethod) == null) {
          ProductCatalogServiceGrpc.getSearchProductsMethod = getSearchProductsMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.SearchProductsRequest, hipstershop.Demo.SearchProductsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.ProductCatalogService", "SearchProducts"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.SearchProductsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.SearchProductsResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ProductCatalogServiceMethodDescriptorSupplier("SearchProducts"))
                  .build();
          }
        }
     }
     return getSearchProductsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ProductCatalogServiceStub newStub(io.grpc.Channel channel) {
    return new ProductCatalogServiceStub(channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ProductCatalogServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    return new ProductCatalogServiceBlockingStub(channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ProductCatalogServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    return new ProductCatalogServiceFutureStub(channel);
  }

  /**
   */
  public static abstract class ProductCatalogServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void listProducts(hipstershop.Demo.Empty request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.ListProductsResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getListProductsMethod(), responseObserver);
    }

    /**
     */
    public void getProduct(hipstershop.Demo.GetProductRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Product> responseObserver) {
      asyncUnimplementedUnaryCall(getGetProductMethod(), responseObserver);
    }

    /**
     */
    public void searchProducts(hipstershop.Demo.SearchProductsRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.SearchProductsResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getSearchProductsMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getListProductsMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.Empty,
                hipstershop.Demo.ListProductsResponse>(
                  this, METHODID_LIST_PRODUCTS)))
          .addMethod(
            getGetProductMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.GetProductRequest,
                hipstershop.Demo.Product>(
                  this, METHODID_GET_PRODUCT)))
          .addMethod(
            getSearchProductsMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.SearchProductsRequest,
                hipstershop.Demo.SearchProductsResponse>(
                  this, METHODID_SEARCH_PRODUCTS)))
          .build();
    }
  }

  /**
   */
  public static final class ProductCatalogServiceStub extends io.grpc.stub.AbstractStub<ProductCatalogServiceStub> {
    private ProductCatalogServiceStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ProductCatalogServiceStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductCatalogServiceStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ProductCatalogServiceStub(channel, callOptions);
    }

    /**
     */
    public void listProducts(hipstershop.Demo.Empty request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.ListProductsResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getListProductsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getProduct(hipstershop.Demo.GetProductRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Product> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetProductMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void searchProducts(hipstershop.Demo.SearchProductsRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.SearchProductsResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSearchProductsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class ProductCatalogServiceBlockingStub extends io.grpc.stub.AbstractStub<ProductCatalogServiceBlockingStub> {
    private ProductCatalogServiceBlockingStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ProductCatalogServiceBlockingStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductCatalogServiceBlockingStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ProductCatalogServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public hipstershop.Demo.ListProductsResponse listProducts(hipstershop.Demo.Empty request) {
      return blockingUnaryCall(
          getChannel(), getListProductsMethod(), getCallOptions(), request);
    }

    /**
     */
    public hipstershop.Demo.Product getProduct(hipstershop.Demo.GetProductRequest request) {
      return blockingUnaryCall(
          getChannel(), getGetProductMethod(), getCallOptions(), request);
    }

    /**
     */
    public hipstershop.Demo.SearchProductsResponse searchProducts(hipstershop.Demo.SearchProductsRequest request) {
      return blockingUnaryCall(
          getChannel(), getSearchProductsMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class ProductCatalogServiceFutureStub extends io.grpc.stub.AbstractStub<ProductCatalogServiceFutureStub> {
    private ProductCatalogServiceFutureStub(io.grpc.Channel channel) {
      super(channel);
    }

    private ProductCatalogServiceFutureStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ProductCatalogServiceFutureStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ProductCatalogServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.ListProductsResponse> listProducts(
        hipstershop.Demo.Empty request) {
      return futureUnaryCall(
          getChannel().newCall(getListProductsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.Product> getProduct(
        hipstershop.Demo.GetProductRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getGetProductMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.SearchProductsResponse> searchProducts(
        hipstershop.Demo.SearchProductsRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getSearchProductsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_LIST_PRODUCTS = 0;
  private static final int METHODID_GET_PRODUCT = 1;
  private static final int METHODID_SEARCH_PRODUCTS = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final ProductCatalogServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(ProductCatalogServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_LIST_PRODUCTS:
          serviceImpl.listProducts((hipstershop.Demo.Empty) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.ListProductsResponse>) responseObserver);
          break;
        case METHODID_GET_PRODUCT:
          serviceImpl.getProduct((hipstershop.Demo.GetProductRequest) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.Product>) responseObserver);
          break;
        case METHODID_SEARCH_PRODUCTS:
          serviceImpl.searchProducts((hipstershop.Demo.SearchProductsRequest) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.SearchProductsResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class ProductCatalogServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ProductCatalogServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return hipstershop.Demo.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("ProductCatalogService");
    }
  }

  private static final class ProductCatalogServiceFileDescriptorSupplier
      extends ProductCatalogServiceBaseDescriptorSupplier {
    ProductCatalogServiceFileDescriptorSupplier() {}
  }

  private static final class ProductCatalogServiceMethodDescriptorSupplier
      extends ProductCatalogServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    ProductCatalogServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (ProductCatalogServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ProductCatalogServiceFileDescriptorSupplier())
              .addMethod(getListProductsMethod())
              .addMethod(getGetProductMethod())
              .addMethod(getSearchProductsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
