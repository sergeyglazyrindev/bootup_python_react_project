import os
from react.render import render_component


def render(template_name, context=None, **kwargs):
    return render_component(
        os.path.join(
            os.getcwd(), 'project', 'static',
            'src', 'js', 'server', template_name
        ),
        context or {},
        **kwargs
    )
