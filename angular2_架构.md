// http://codin.im/2016/09/18/angular2-architecture-intro/
//  http://www.tuicool.com/articles/EvEZjmZ
//  https://www.cnblogs.com/shitoupi/p/6618449.html

// 模块

import{ NgModule }from'@angular/core';
import{ CommonModule }from'@angular/common';
import{ FormsModule }from'@angular/forms';

import{ FriendModule }from'./friend/friend.module';

import{ MessageListComponent }from'./message/list.component';
import{ MessageDetailComponent }from'./message/detail.component';
import{ MessageFormComponent }from'./message/form.component';
import{ MessageService }from'./todo.service';

@NgModule({
 imports: [CommonModule, FormsModule, FriendModule ],
 exports: [MessageListComponent],
 declarations: [MessageListComponent, MessageDetailComponent, MessageFormComponent],
 providers: [MessageService]
})
exportclassMessageModule{}


// 组件 
// Angular2的组件是一个可重用的单元，包含模版、样式，还有数据、事件等交互逻辑。

import{ Component }from'@angular/core';

import{ Todo }from'../todo';
import{ TodoService }from'../todo.service';

@Component({
 selector: 'todo-list',
 templateUrl: 'app/todo/list/list.component.html',
 styleUrls: ['app/todo//list/list.component.css']
})
exportclassTodoListComponent{
 newTodo: Todo = newTodo();
	constructor(private todoService: TodoService) { }
	 addTodo() {
	this.todoService.addTodo(this.newTodo);
	this.newTodo =newTodo();
 }
 get todos() {
	returnthis.todoService.getAllTodos();
 }
}


// 元数据 
// 元数据就是在定义模块、组件、服务的时候，Decorator方法里面的参数内容，例如一个AppComponent的元数据，就是 @Component 里面的参数，如下：
{
 selector: 'root-app',
 templateUrl: 'app/app.component.html',
 styleUrls: ['app/app.component.css']
}

//服务
//在Angular2中，服务是一个很宽泛的定义，任何的类都可以被定义成服务，这个类中可以包含一些业务方法，可以包含环境配置变量。Angular2也没有对服务的定义做任何的规则限制。下面就是一个最简单的服务：
// 我们只需要定义一个class，并把它export就可以。但是，一般我们都是结合依赖注入来使用服务。

exportclassSomeService{
 someConfig: {foo: 'bar'}
 getConfig() { returnsomeConfig; }
 handle(msg: any) { console.log(msg); }
}


// 依赖注入
从Angular1的版本开始，依赖注入就是一个很核心的概念，在版本2中，主要是用于管理service实例的注入。在上面讲的service中，我们创建了一个SomeService，在传统的用法中，我们都是在需要用他的地方手动创建一个这个类的实例，然后调用他的相应方法或属性，例如:

letmyService =newSomeService();
myService.handle('the message');
但是，当我们的系统中有很多service类，甚至这些service类相互之间又需要引用的时候，我们就没有办法都通过手动创建的方式来获取service实例。更重要的是，这对于系统的解耦非常不便，不同的服务之间直接创建和引用，会让系统变得非常难以维护。

Angular给我们提供了一个非常好的解决方案，它借用了Java等语言中某些容器库的概念，将所有service实例的创建都由容器来完成，当一个service需要引用另一个service的时候，不是自己创建另一个service的实例，而是从容器中获取那个service的实例。

要使用依赖注入的功能，首先我们的service必须由一个装饰器 @Injectable 来定义：

@Injectable()
exportclassSomeService{
// 跟之前一样，省略...
}
然后，在Component中需要加一个providers，也就是服务的创建者：

@Component({
 selector: 'some-list',
 templateUrl: 'some.component.html',
 providers: [ SomeService ]
})
exportclassSomeComponent{
constructor(private theService: SomeService) { }
// 省略其他方法。
}，
这样这个服务就可以在SomeComponent中自动注入了。它的构造函数中有一个参数theService，类型是SomeService，Angular在创建这个Component的时候，就会从容器里面查找SomeService类的实例，如果有就用这个实例去初始化SomeComponent对象；如果没有就先新建一个，再初始化。这个过程，就是Angular的依赖注入。

有关依赖注入，需要注意的一点就是依赖注入的作用范围。Angular2的依赖注入是一个树形的结构，就好像组件树一样。在上面的例子中，我们在 SomeComponent 的providers 里面设置了 SomeService ，也就是说，在SomeComponent这个节点，以及它所有的子节点的组件上，SomeService类的实例是共用的，它们都共享一个实例。但是，在这个SomeComponent的父组件里，它如果也想注入SomeService来使用的话，就没有办法从容器中获得，除非在它的父组件中的providers中也添加了这个服务。

在我们之前教程《Angular2入门教程-2》的TodoList应用实例中，我们把todo应用相关的类都添加到一个模块里，内容如下：

import{ NgModule }from'@angular/core';
import{ CommonModule }from'@angular/common';
import{ FormsModule }from'@angular/forms';

import{ TodoListComponent }from'./list/list.component';
import{ TodoDetailComponent }from'./detail/detail.component';
import{ TodoItemComponent }from'./item/item.component';
import{ TodoService }from'./todo.service';

@NgModule({
 imports: [CommonModule, FormsModule ],
 declarations: [TodoListComponent, TodoDetailComponent, TodoItemComponent],
 providers: [TodoService]
})
exportclassTodoModule{}
我们在这个模块的定义中定义了 providers: [TodoService] ，这样，这个模块的几个Component都可以共用这个TodoService的实例。



数据绑定
在jQuery或者更早的时代，当我们需要更新页面的内容的时候，我们一般都需要自己获得页面的DOM，然后，设置他的值。当页面上的内容需要更新到js端的时候，又需要设置一些事件，如onclick, onblur等，然后在响应事件里面再从页面获得这个值。这不仅需要些很多代码、浪费时间，还非常容易出错。终于，Angular把我们从这些枯燥的工作中解放出来，提供了数据绑定的功能。

在Angular1.x的版本中，数据绑定是通过轮询实现的。在Angular1里，所有需要绑定的数据都会在$scope中，Angular1.x有一个轮训机制，每隔一段时间就检查所有绑定的变量，检查他们现在的值跟上次检查的值是否一致，如果不一致，就触发相应的方法更新页面的内容。这虽然给我们开发带来了便利，但是如果有太多的变量需要监听，就会造成很大的性能问题。

在Angular2里面，绑定的数据的监听是通过zone.js实现。通俗来讲，zone给所有有可能更新数据的方法加了一个补丁，就像AOP，或者说代理模式。每当这些更新数据的方法被调用的时候，就会触发另一个方法，告诉Angular有数据修改，Angular再去判断变量是否修改，如果有修改，就更新DOM。

而且，Angular2的数据更新检测是在每个组件上有一个检测器。这样，就算应用中有再多绑定的变量，当有一个数据修改的事件以后，也只是对应的那个组件的检测器被触发，来检查它以及它所有的子组件的数据修改。

这两方面结合，就使得Angular2应用的性能能够有很大的提升。

说了那么多原理，我们再来看看Angular2是数据绑定的几种方式，结合下面的代码看看每种方式的用途。这个模板中包括一个输入框用于新建，包含一个列表显示，以及一个子组件：

<headerclass="header">
<inputclass="new-hero"placeholder="输入名字"[(ngModel)]="newHero.name"(keyup.enter)="addHero()">
</header>
<ul>
<li>{{hero.name}}</li>
<hero-detail[hero]="selectedHero"></hero-detail>
<li(click)="selectHero(hero)"></li>
</ul>
我们看看这个模板里面包含的4种数据绑定的方式：

插值表达式 
这种方式是将组件中的数据hero.name显示到页面上那个
标签里。
[user] 属性绑定

这种方式用于将当前组件中的变量传递到子组件，也就是从list组件中，对于每一个hero，将它传递到子组件HeroDetailComponent中。在子组件中，就需要这样来获取：

@Input() todo: Todo;
(click)，(keyup.enter)

这就是事件绑定，将页面上的DOM事件绑定到组件中的某个方法上。也就是当用户点击(click)，或者敲回车键后弹起(keyup.enter)时，调用组件中的某个方法。

[(ngModel)] 
这种是双向的数据绑定，上面3个都是单向的。双向绑定就是用户在页面上修改这个输入框的值时，这个值就会直接反馈到组件中，同样，如果在组件中通过某种方式修改了这个值，页面上的输入框中，也会显示最新的值。


对于上面的 [] 和 () 两种类型的绑定，可以理解成’输入’和’输出’。 [] 相当于一个组件的输入，一般这个输入从它的父组件获得；() 相当于组件的输出。上面的例子是用事件绑定，将数据”输出”到组件里。实际上，我们还可以用一种 EventEmitter 把数据”输出”到父组件。




下面，我们来看一下Angular应用的工作流程。

我们定义一个根模块和一个根组件，然后在main.ts里面用这个根模块启动应用。
根组件里面的一个html标签如果匹配了某一个组件的’selector’，这个组件就会被加载在这个标签里面。这样，整个应用就是一个组件树，
我们定义的Component信息，也就是类和Metadata(元数据)，Angular会根据这个组件定义将组件中定义的模板显示到selector对应的标签上，将样式应用到模板页面上。组件和模板之间又通过数据绑定联系起来，组件中的变量通过数据绑定展示到模板上，模板又通过事件绑定，对应到组件里的方法上。Directive的工作原理也跟上面类似。
最后，我们定义的service被Angular的Injector保存在一个树形结构的容器里，在某个组件中当我们需要使用这个service时，就可以在构造函数中直接获得这个service的实例，而不用手动创建。这样，多个组件，或者模块都可以共用一个service的实例。所以，service除了提供业务方法，也能提供共享数据、数据传输等功能。






