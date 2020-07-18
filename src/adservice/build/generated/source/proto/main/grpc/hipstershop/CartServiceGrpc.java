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
public final class CartServiceGrpc {

  private CartServiceGrpc() {}

  public static final String SERVICE_NAME = "hipstershop.CartService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.AddItemRequest,
      hipstershop.Demo.Empty> getAddItemMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "AddItem",
      requestType = hipstershop.Demo.AddItemRequest.class,
      responseType = hipstershop.Demo.Empty.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.AddItemRequest,
      hipstershop.Demo.Empty> getAddItemMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.AddItemRequest, hipstershop.Demo.Empty> getAddItemMethod;
    if ((getAddItemMethod = CartServiceGrpc.getAddItemMethod) == null) {
      synchronized (CartServiceGrpc.class) {
        if ((getAddItemMethod = CartServiceGrpc.getAddItemMethod) == null) {
          CartServiceGrpc.getAddItemMethod = getAddItemMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.AddItemRequest, hipstershop.Demo.Empty>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.CartService", "AddItem"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.AddItemRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.Empty.getDefaultInstance()))
                  .setSchemaDescriptor(new CartServiceMethodDescriptorSupplier("AddItem"))
                  .build();
          }
        }
     }
     return getAddItemMethod;
  }

  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.GetCartRequest,
      hipstershop.Demo.Cart> getGetCartMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetCart",
      requestType = hipstershop.Demo.GetCartRequest.class,
      responseType = hipstershop.Demo.Cart.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.GetCartRequest,
      hipstershop.Demo.Cart> getGetCartMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.GetCartRequest, hipstershop.Demo.Cart> getGetCartMethod;
    if ((getGetCartMethod = CartServiceGrpc.getGetCartMethod) == null) {
      synchronized (CartServiceGrpc.class) {
        if ((getGetCartMethod = CartServiceGrpc.getGetCartMethod) == null) {
          CartServiceGrpc.getGetCartMethod = getGetCartMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.GetCartRequest, hipstershop.Demo.Cart>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.CartService", "GetCart"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.GetCartRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.Cart.getDefaultInstance()))
                  .setSchemaDescriptor(new CartServiceMethodDescriptorSupplier("GetCart"))
                  .build();
          }
        }
     }
     return getGetCartMethod;
  }

  private static volatile io.grpc.MethodDescriptor<hipstershop.Demo.EmptyCartRequest,
      hipstershop.Demo.Empty> getEmptyCartMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "EmptyCart",
      requestType = hipstershop.Demo.EmptyCartRequest.class,
      responseType = hipstershop.Demo.Empty.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<hipstershop.Demo.EmptyCartRequest,
      hipstershop.Demo.Empty> getEmptyCartMethod() {
    io.grpc.MethodDescriptor<hipstershop.Demo.EmptyCartRequest, hipstershop.Demo.Empty> getEmptyCartMethod;
    if ((getEmptyCartMethod = CartServiceGrpc.getEmptyCartMethod) == null) {
      synchronized (CartServiceGrpc.class) {
        if ((getEmptyCartMethod = CartServiceGrpc.getEmptyCartMethod) == null) {
          CartServiceGrpc.getEmptyCartMethod = getEmptyCartMethod = 
              io.grpc.MethodDescriptor.<hipstershop.Demo.EmptyCartRequest, hipstershop.Demo.Empty>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "hipstershop.CartService", "EmptyCart"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.EmptyCartRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  hipstershop.Demo.Empty.getDefaultInstance()))
                  .setSchemaDescriptor(new CartServiceMethodDescriptorSupplier("EmptyCart"))
                  .build();
          }
        }
     }
     return getEmptyCartMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static CartServiceStub newStub(io.grpc.Channel channel) {
    return new CartServiceStub(channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static CartServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    return new CartServiceBlockingStub(channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static CartServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    return new CartServiceFutureStub(channel);
  }

  /**
   */
  public static abstract class CartServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void addItem(hipstershop.Demo.AddItemRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Empty> responseObserver) {
      asyncUnimplementedUnaryCall(getAddItemMethod(), responseObserver);
    }

    /**
     */
    public void getCart(hipstershop.Demo.GetCartRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Cart> responseObserver) {
      asyncUnimplementedUnaryCall(getGetCartMethod(), responseObserver);
    }

    /**
     */
    public void emptyCart(hipstershop.Demo.EmptyCartRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Empty> responseObserver) {
      asyncUnimplementedUnaryCall(getEmptyCartMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getAddItemMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.AddItemRequest,
                hipstershop.Demo.Empty>(
                  this, METHODID_ADD_ITEM)))
          .addMethod(
            getGetCartMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.GetCartRequest,
                hipstershop.Demo.Cart>(
                  this, METHODID_GET_CART)))
          .addMethod(
            getEmptyCartMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                hipstershop.Demo.EmptyCartRequest,
                hipstershop.Demo.Empty>(
                  this, METHODID_EMPTY_CART)))
          .build();
    }
  }

  /**
   */
  public static final class CartServiceStub extends io.grpc.stub.AbstractStub<CartServiceStub> {
    private CartServiceStub(io.grpc.Channel channel) {
      super(channel);
    }

    private CartServiceStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CartServiceStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CartServiceStub(channel, callOptions);
    }

    /**
     */
    public void addItem(hipstershop.Demo.AddItemRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Empty> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getAddItemMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getCart(hipstershop.Demo.GetCartRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Cart> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetCartMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void emptyCart(hipstershop.Demo.EmptyCartRequest request,
        io.grpc.stub.StreamObserver<hipstershop.Demo.Empty> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getEmptyCartMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class CartServiceBlockingStub extends io.grpc.stub.AbstractStub<CartServiceBlockingStub> {
    private CartServiceBlockingStub(io.grpc.Channel channel) {
      super(channel);
    }

    private CartServiceBlockingStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CartServiceBlockingStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CartServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public hipstershop.Demo.Empty addItem(hipstershop.Demo.AddItemRequest request) {
      return blockingUnaryCall(
          getChannel(), getAddItemMethod(), getCallOptions(), request);
    }

    /**
     */
    public hipstershop.Demo.Cart getCart(hipstershop.Demo.GetCartRequest request) {
      return blockingUnaryCall(
          getChannel(), getGetCartMethod(), getCallOptions(), request);
    }

    /**
     */
    public hipstershop.Demo.Empty emptyCart(hipstershop.Demo.EmptyCartRequest request) {
      return blockingUnaryCall(
          getChannel(), getEmptyCartMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class CartServiceFutureStub extends io.grpc.stub.AbstractStub<CartServiceFutureStub> {
    private CartServiceFutureStub(io.grpc.Channel channel) {
      super(channel);
    }

    private CartServiceFutureStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CartServiceFutureStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CartServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.Empty> addItem(
        hipstershop.Demo.AddItemRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getAddItemMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.Cart> getCart(
        hipstershop.Demo.GetCartRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getGetCartMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<hipstershop.Demo.Empty> emptyCart(
        hipstershop.Demo.EmptyCartRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getEmptyCartMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_ADD_ITEM = 0;
  private static final int METHODID_GET_CART = 1;
  private static final int METHODID_EMPTY_CART = 2;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final CartServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(CartServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_ADD_ITEM:
          serviceImpl.addItem((hipstershop.Demo.AddItemRequest) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.Empty>) responseObserver);
          break;
        case METHODID_GET_CART:
          serviceImpl.getCart((hipstershop.Demo.GetCartRequest) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.Cart>) responseObserver);
          break;
        case METHODID_EMPTY_CART:
          serviceImpl.emptyCart((hipstershop.Demo.EmptyCartRequest) request,
              (io.grpc.stub.StreamObserver<hipstershop.Demo.Empty>) responseObserver);
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

  private static abstract class CartServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    CartServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return hipstershop.Demo.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("CartService");
    }
  }

  private static final class CartServiceFileDescriptorSupplier
      extends CartServiceBaseDescriptorSupplier {
    CartServiceFileDescriptorSupplier() {}
  }

  private static final class CartServiceMethodDescriptorSupplier
      extends CartServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    CartServiceMethodDescriptorSupplier(String methodName) {
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
      synchronized (CartServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new CartServiceFileDescriptorSupplier())
              .addMethod(getAddItemMethod())
              .addMethod(getGetCartMethod())
              .addMethod(getEmptyCartMethod())
              .build();
        }
      }
    }
    return result;
  }
}
